package com.idb.laauth.Models.UserGroup;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupAssignModel {
    private String username;

    private List<String> groupIds;
}
