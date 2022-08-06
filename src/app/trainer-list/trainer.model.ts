export class trainerModel {
    constructor(
        public name: string,
        public email: string,
        public phone: string,
        public dob: string,
        public address: string,
        public highestqual: string,
        public company: string,
        public designation: string,
        public skills: [string],
        public courses: [string],
        public photo: string,
        public trainer_id: string,
        public approved: boolean,
        public ict_data: {
            start_date: Date,
            end_date: Date,
            time: string,
            course_id: string,
            batch_id: string,
            meeting_location: string,
            schedule: string
        }
    ) {}
}
