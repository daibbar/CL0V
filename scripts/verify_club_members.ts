
import { getClubMembers } from './actions/club-actions';
import db from './lib/db';

async function verifyClubMembers() {
    // 1. Find a club that has members
    const club = db.prepare(`
        SELECT c.clubId, c.clubName 
        FROM clubs c
        JOIN clubMemberships cm ON c.clubId = cm.clubId 
        LIMIT 1
    `).get() as { clubId: number; clubName: string } | undefined;

    if (!club) {
        console.log("No clubs with members found.");
        return;
    }

    console.log(`Checking members for club: ${club.clubName} (ID: ${club.clubId})`);
    
    // 2. Call the action
    const members = await getClubMembers(club.clubId);
    console.log("Members found:", members);
}

verifyClubMembers();
