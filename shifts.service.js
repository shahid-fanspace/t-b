
/* shifts - {
    _id,
    facilityId,
    from,
    to,
    agentId,
    cratedAt,
    lastUpdatedAt,
    deletedAt
}*/

const db = new Object();

export const getShiftDetailsByShift = (shift) => {
    const from = shift.from;
    const to = shift.to;

    if (to < from) {
        throw new Error('Invalid shift details.');
    }

    // make a db call to fetch all shift details by below condition
    // {$gte: from, $lte: to}
    const shifDetails = []; // get shiftDetails from above query execution
    return shifDetails;
}

export const getFacilityDetailsByShifts = (shifts) => {
    const shiftFacilityIdMapping = {};
    for (const shift of shifts) {
        try {
            shiftFacilityIdMapping[shift] = getFacilityIdsByShift(shift);
        } catch (error) {
            console.error(error);
        }
    }
    return shiftFacilityIdMapping;
}

export const getShiftByFacility = (facilityId) => {
    // search from db by facilityId
    const dbResult = db.find({facilityId});
    return dbResult;
}