


export interface practiceApplication{

    applicationState:string
    coachId:string
    practiceDatetime:string
    practiceId:string
    practiceType:string
    studentId:string
}
export interface student{
    birthday:   string
    coachId:    string
    email:      string
    gender:     string
    headPhoto:  string
    healthId:   string
    password:   string
    phone:      string
    schoolName: string
    studentId:  string
    studentName:string
    studyType:  string
    username:   string


}
export interface examinationStudent{
    examRecordsId: string
    examinationId: string
    examinationName: string
    examinationSubject: string
    examinationType: string
    score: number
    studentId: string
    studentName: string
    examinationOpenTime: string
    examinationCloseTime: string
    examinationTime: number
}

export interface examRecords{
    examRecordsId: string
    studentId: string
    examinationId: string
    score: number

}

export interface examination{
    examinationAddress: string
    examinationCloseTime: string
    examinationId: string
    examinationName: string
    examinationOpenTime: string
    examinationSubject: string
    examinationTime: string
    examinationType: string
    organizationId: string
}

export interface studentCondition {
    conditionId: string
    practiceTimeFour: number
    practiceTimeOne: number
    practiceTimeThree: number
    practiceTimeTwo: number
    studentId: string
    subjectFour: number
    subjectOne: number
    subjectThree: number
    subjectTwo: number
}

export interface health {
    healthId:string
    height:number
    weight:number
    imageUrl:string
    studentId:string
    surgicalHistory:string
    allergyHistory:string
}
export interface examingMultipleChoice {
    answer: string
    correctAnswer: string
    examinationId: string
    fraction: number
    multipleChoiceDescribe: string
    multipleChoiceId: string
    option1: string
    option2: string
    option3: string
    option4: string
    photoUrl: string
}
export interface video {
    schoolName: string
    videoId: string
    videoName: string
    videoType: string
    videoUrl: string
}
