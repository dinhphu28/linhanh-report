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
public class BaoCaoCuocGoiDetail {
    @Id
    @Column(name = "time_view")
    private String time_view;

    @Column(name = "source_display_name")
    private String source_display_name;

    @Column(name = "destination_display_name")
    private String destination_display_name;

    @Column(name = "status_log")
    private String status_log;

    @Column(name = "ringing_duration")
    private String ringing_duration;

    @Column(name = "talking_duration")
    private String talking_duration;

    @Column(name = "total_time")
    private String total_time;

    @Column(name = "note_end")
    private String note_end;

    @Column(name = "recording_url")
    private String recording_url;

    @Column(name = "s_start_time")
    private String s_start_time;

    @Column(name = "call_id")
    private String call_id;

    @Column(name = "ringing_duration_view")
    private String ringing_duration_view;

    @Column(name = "talking_duration_view")
    private String talking_duration_view;

    @Column(name = "total_time_view")
    private String total_time_view;
}
