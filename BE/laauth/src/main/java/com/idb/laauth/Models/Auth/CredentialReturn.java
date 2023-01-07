package com.idb.laauth.Models.Auth;

import java.util.List;

import com.idb.laauth.Models.Group.GroupBaseModel;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CredentialReturn {
    private String username;

    private String role;

    private String token;

    private List<GroupBaseModel> assignedGroups;
}
