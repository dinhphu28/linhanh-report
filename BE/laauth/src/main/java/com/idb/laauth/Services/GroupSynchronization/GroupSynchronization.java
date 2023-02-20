package com.idb.laauth.Services.GroupSynchronization;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idb.laauth.Entities.Group3CX;
import com.idb.laauth.Models.Group.GroupBaseModel;
import com.idb.laauth.Services.Group3CXService;
import com.idb.laauth.Services.UserGroupService;
import com.idb.laauth.Services.WebClient.GroupClientService;

@Service
public class GroupSynchronization {
    @Autowired
    private GroupClientService groupClientService;

    @Autowired
    private Group3CXService group3cxService;

    @Autowired
    private UserGroupService userGroupService;

    public void sycnGroup() {
        List<Group3CX> group3cxs = group3cxService.retrieveAll();

        List<Group3CX> newGroups = new ArrayList<Group3CX>();
        List<GroupBaseModel> groupBaseModels = groupClientService.retrieveAll();
        for (GroupBaseModel groupBaseModel : groupBaseModels) {
            Group3CX tmp = new Group3CX(groupBaseModel.getId(), groupBaseModel.getName(), 0, null);

            newGroups.add(tmp);
        }

        int group3cxsLength = group3cxs.size();
        int newGroupsLength = newGroups.size();
        // int group3cxsFirstIndex = 0;
        // int newGroupsFirstIndex = 0;

        List<Group3CX> existedElements = new ArrayList<Group3CX>();

        for(int ii = 0; ii < group3cxsLength; ii++) {
            for(int jj = 0; jj < newGroupsLength; jj++) {
                if(group3cxs.get(ii).getId().equals(newGroups.get(jj).getId())) {
                    existedElements.add(group3cxs.get(ii));
                }
            }
        }

        List<Group3CX> willDeletedElements = group3cxs;

        for (Group3CX existedElement : existedElements) {
            willDeletedElements.remove(existedElement);
        }

        // Delete Groups
        List<String> willDeletedElementIds = new ArrayList<String>();

        int countNoUserGroupsIsDeleted = 0;
        for (Group3CX group3cx : willDeletedElements) {
            willDeletedElementIds.add(group3cx.getId());

            Boolean userGroupsIsDeleted = userGroupService.deleteAllByGroupId(group3cx.getId());

            if(userGroupsIsDeleted) {
                countNoUserGroupsIsDeleted++;
            }
        }

        Boolean group3cxIsDeleted = false;

        if(countNoUserGroupsIsDeleted == willDeletedElements.size()) {
            group3cxIsDeleted = group3cxService.deleteMultiple(willDeletedElementIds);
        }

        // Save Groups
        List<Group3CX> group3cxSaved = group3cxService.saveAll(newGroups);
    }
}
