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
public class TongCallKhuVuc {
    @Id
    @Column(name = "idgrp_")
    private String idgrp_;

    @Column(name = "name_group_")
    private String name_group_;

    @Column(name = "slg_call_")
    private Integer slg_call_;

    @Column(name = "slg_call_ans_")
    private Integer slg_call_ans_;

    @Column(name = "slg_call_un_ans_")
    private Integer slg_call_un_ans_;

    @Column(name = "tytrong_")
    private Double tytrong_;
}
