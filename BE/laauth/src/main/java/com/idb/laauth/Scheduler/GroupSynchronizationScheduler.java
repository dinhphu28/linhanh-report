package com.idb.laauth.Scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.idb.laauth.Services.GroupSynchronization.GroupSynchronization;

@Component
public class GroupSynchronizationScheduler {
    @Autowired
    private GroupSynchronization groupSynchronization;

    @Scheduled(cron = "${idb.properties.schedule.cron-expression}")
    public void syncGroup() {
        groupSynchronization.sycnGroup();
    }
}
