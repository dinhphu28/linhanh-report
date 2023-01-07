package com.idb.linhanhreport.Entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Top10AgentMaxTgianCgoi {
    @Id
    @Column(name = "ext_number_")
    private String ext_number_;

    @Column(name = "ext_name")
    private String ext_name;

    @Column(name = "sum_talktime_")
    private Integer sum_talktime_;
}
