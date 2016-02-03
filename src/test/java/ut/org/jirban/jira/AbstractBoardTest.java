/*
 * JBoss, Home of Professional Open Source.
 * Copyright 2016, Red Hat, Inc., and individual contributors
 * as indicated by the @author tags. See the copyright.txt file in the
 * distribution for a full listing of individual contributors.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package ut.org.jirban.jira;

import org.jirban.jira.api.BoardConfigurationManager;
import org.jirban.jira.api.BoardManager;
import org.jirban.jira.impl.BoardConfigurationManagerBuilder;
import org.jirban.jira.impl.BoardManagerBuilder;
import org.jirban.jira.impl.JirbanIssueEvent;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.bc.issue.search.SearchService;
import com.atlassian.jira.issue.link.IssueLinkManager;
import com.atlassian.jira.junit.rules.MockitoContainer;
import com.atlassian.jira.junit.rules.MockitoMocksInContainer;
import com.atlassian.jira.mock.component.MockComponentWorker;
import com.atlassian.jira.user.util.UserManager;

import ut.org.jirban.jira.mock.CrowdUserBridge;
import ut.org.jirban.jira.mock.IssueLinkManagerBuilder;
import ut.org.jirban.jira.mock.IssueRegistry;
import ut.org.jirban.jira.mock.SearchServiceBuilder;
import ut.org.jirban.jira.mock.UserManagerBuilder;

/**
 * @author Kabir Khan
 */
public class AbstractBoardTest {

    @Rule
    public MockitoContainer mockitoContainer = MockitoMocksInContainer.rule(this);

    protected BoardManager boardManager;
    protected UserManager userManager;
    protected IssueRegistry issueRegistry;

    @Before
    public void initializeMocks() throws Exception {

        BoardConfigurationManager cfgManager = new BoardConfigurationManagerBuilder()
                .addConfigActiveObjects("config/board-tdp.json")
                .build();

        MockComponentWorker worker = new MockComponentWorker();
        userManager = new UserManagerBuilder()
                .addDefaultUsers()
                .build(worker);

        issueRegistry = new IssueRegistry(userManager);
        SearchService searchService = new SearchServiceBuilder()
                .setIssueRegistry(issueRegistry)
                .build(worker);
        IssueLinkManager issueLinkManager = new IssueLinkManagerBuilder().build();
        worker.init();

        boardManager = new BoardManagerBuilder()
                .setBoardConfigurationManager(cfgManager)
                .setUserManager(userManager)
                .setSearchService(searchService)
                .setIssueLinkManager(issueLinkManager)
                .build();
    }

    protected JirbanIssueEvent createCreateEventAndAddToRegistry(String issueKey,
                                                                 String issueType, String priority, String summary, String username, String state) {
        CrowdUserBridge userBridge = new CrowdUserBridge(userManager);
        User user = userBridge.getUserByKey(username);
        String projectCode = issueKey.substring(0, issueKey.indexOf("-"));
        JirbanIssueEvent create = JirbanIssueEvent.createCreateEvent(issueKey, projectCode, issueType, priority,
                summary, user, state);

        issueRegistry.addIssue(projectCode, issueType, priority, summary, username, state);
        return create;
    }

    protected JirbanIssueEvent createUpdateEventAndAddToRegistry(String issueKey, String issueType,
                                                                 String priority, String summary, String username, boolean unassigned, String state, boolean rank) {
        Assert.assertFalse(username != null && unassigned);

        User user;
        if (unassigned) {
            user = JirbanIssueEvent.UNASSIGNED;
        } else {
            CrowdUserBridge userBridge = new CrowdUserBridge(userManager);
            user = userBridge.getUserByKey(username);
        }
        String projectCode = issueKey.substring(0, issueKey.indexOf("-"));
        JirbanIssueEvent update = JirbanIssueEvent.createUpdateEvent(issueKey, projectCode, issueType, priority,
                summary, user, state, rank);

        issueRegistry.updateIssue(issueKey, projectCode, issueType, priority, summary, username, state);
        return update;
    }

    protected enum IssueType {
        TASK(0),
        BUG(1),
        FEATURE(2);

        final int index;
        final String name;

        IssueType(int index) {
            this.index = index;
            this.name = super.name().toLowerCase();
        }


    }

    protected enum Priority {
        HIGHEST(0),
        HIGH(1),
        LOW(2),
        LOWEST(3);

        final int index;
        final String name;

        Priority(int index) {
            this.index = index;
            this.name = super.name().toLowerCase();
        }
    }
}