'use server'

import db from '@/lib/db';
import { Activity, Club } from '@/types/db';

export async function getDashboardStats() {
  try {
    const clubCount = (db.prepare('SELECT COUNT(*) as count FROM clubs').get() as { count: number }).count;
    
    // Upcoming events (start date >= today)
    const upcomingEventsCount = (db.prepare("SELECT COUNT(*) as count FROM events WHERE startDate >= date('now')").get() as { count: number }).count;
    
    // Active students: students who are members of at least one club
    const activeStudentsCount = (db.prepare('SELECT COUNT(DISTINCT studentId) as count FROM clubMemberships').get() as { count: number }).count;
    
    const activityCount = (db.prepare('SELECT COUNT(*) as count FROM activities').get() as { count: number }).count;

    return {
      clubCount,
      upcomingEventsCount,
      activeStudentsCount,
      activityCount
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      clubCount: 0,
      upcomingEventsCount: 0,
      activeStudentsCount: 0,
      activityCount: 0
    };
  }
}

export async function getRecentActivities() {
  try {
    // Fetch last 5 activities created/updated or starting soon? 
    // Usually "Recent Activities" on a dashboard means "what's happening recently or soon".
    // Let's go with the most recently created (highest ID usually implies creation if autoincrement) 
    // OR sorted by startDate DESC. Let's do startDate DESC to show latest things happening.
    const activities = db.prepare(`
      SELECT activityName as name, type, startDate as time
      FROM activities 
      ORDER BY startDate DESC 
      LIMIT 5
    `).all() as { name: string, type: string, time: string }[];
    
    return activities;
  } catch (error) {
    console.error("Failed to fetch recent activities:", error);
    return [];
  }
}

export async function getClubCategoryStats() {
  try {
    const totalClubs = (db.prepare('SELECT COUNT(*) as count FROM clubs').get() as { count: number }).count;
    
    if (totalClubs === 0) return [];

    const stats = db.prepare(`
      SELECT category, COUNT(*) as count
      FROM clubs
      GROUP BY category
    `).all() as { category: string, count: number }[];

    return stats.map(stat => ({
      category: stat.category,
      count: stat.count,
      percentage: Math.round((stat.count / totalClubs) * 100)
    }));
  } catch (error) {
    console.error("Failed to fetch club category stats:", error);
    return [];
  }
}

export async function getEngagementMetrics() {
    try {
        const totalStudents = (db.prepare('SELECT COUNT(*) as count FROM students').get() as { count: number }).count;
        const activeStudents = (db.prepare('SELECT COUNT(DISTINCT studentId) as count FROM clubMemberships').get() as { count: number }).count;
        
        const engagementRate = totalStudents > 0 ? Math.round((activeStudents / totalStudents) * 100) : 0;

        // Calculate event attendance rate (unique students participating in events / total students)
        const eventParticipants = (db.prepare('SELECT COUNT(DISTINCT studentId) as count FROM eventParticipants').get() as { count: number }).count;
        const eventAttendanceRate = totalStudents > 0 ? Math.round((eventParticipants / totalStudents) * 100) : 0;

        return {
            engagementRate,
            eventAttendanceRate
        };
    } catch (error) {
        console.error("Failed to fetch engagement metrics:", error);
        return { engagementRate: 0, eventAttendanceRate: 0 };
    }
}
