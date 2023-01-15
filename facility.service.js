const crypto = require("crypto");
const shiftSvc = require('./shifts.service');
const agentSvc = require('./agents.service');

const occupiedIds = new Set();
const facilityCustomIdMap = {};

// id - facilityId, customId - choosen by staff
export const addCustomId = (id, customId) => {
    if (occupiedIds.has(customId)) { // In real this check will be going to be done on redis cache
        throw new Error('Entered id is not available, please use different one.');
    }
    facilityCustomIdMap[id] = customId;
    occupiedIds.add(customId);
    return customId;
}

export const getCustomFacilityId = (id) => {
    if (!facilityCustomIdMap[id]) {
        return id;
    }
    return facilityCustomIdMap[id];
}

export const generateReport = (shifts) => {
    const shiftDetails = shiftSvc.getFacilityDetailsByShifts(shifts);
    const pdfObjectList = [];
    for (const shifDetail of shiftDetails) {
        const customFacilityId = getCustomFacilityId(shifDetail.facilityId);
        const agent = agentSvc.getAgent(shifDetail.agentId);
        pdfObjectList.push({
            reportId: generateRandomHashForReport(shifDetail),
            facilityId: customFacilityId,
            agentId: agent._id,
            agentName: agent.name,
            shiftFrom: shifDetail.from,
            shiftTo: shifDetail.to,
        })
    }
    // pass pdfObjectList to pdf generator service, that's roles will be to
    // generate report and dump to the cloud storage like, s3 or google drive.
    return []; // list of urls where report has been uploaded.
}

const generateRandomHashForReport = (shifDetail) => {
    return crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
}