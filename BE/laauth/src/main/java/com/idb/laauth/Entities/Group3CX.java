package com.idb.laauth.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "dir_group_3cx")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Group3CX {
    @Id
    // @GeneratedValue(generator = "UUID")
    // @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id")
    private String id;

    @Column(name = "c_group_name")
    private String groupName;

    @Column(name = "c_group_level")
    private Integer groupLevel;

    @Column(name = "c_parent_group_id")
    private String parentGroupId;
}
