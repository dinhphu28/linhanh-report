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
public class BaoCaoCuocGoiTotal {
    @Id
    @Column(name = "total_call_")
    private Integer total_call_;

    @Column(name = "slg_ans_")
    private Integer slg_ans_;

    @Column(name = "slg_un_ans_")
    private Integer slg_un_ans_;

    @Column(name = "total_ringing_")
    private String total_ringing_;

    @Column(name = "total_talking_")
    private String total_talking_;

    @Column(name = "total_time_")
    private String total_time_;
}
