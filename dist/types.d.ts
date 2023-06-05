interface Report {
    id: string;
    source: string;
    sourceIdentityId: string;
    reference: Reference;
    state: string;
    payload: Payload;
    created: string;
}
interface Reference {
    referenceId: string;
    referenceType: string;
}
interface Payload {
    source: string;
    reportType: string;
    message: string | null;
    reportId: string;
    referenceResourceId: string;
    referenceResourceType: string;
}
export { Report, Reference, Payload };
