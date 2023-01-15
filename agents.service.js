/* agents - {
    _id,
    name,
    facilityIds,
    activeFacilityId,
    activeFacilityJoinedAt,
    createdAt,
    lastUpdatedAt,
    deleted
}*/

const db = [{
    _id: 'random_1',
    name: 'Shahid',
    facilityIds: ['fac_1', 'fac_2'],
    activeFacilityId: 'fac_2',
    activeFacilityJoinedAt: 1673745234000,
    createdAt: 1673745234000,
    deleted: false,
}]

export const getAgent = (id) => {
    let agent;
    for (const dbAgent of db) {
        if (id === dbAgent._id) {
            return agent;
        }
    }
    throw new Error(`Unable to find agent by given id : ${id}`);
}