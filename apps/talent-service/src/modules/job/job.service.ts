import { Injectable } from '@nestjs/common';

@Injectable()
export class JobService {
  constructor() {}

  getJobs() {
    return [
      {
        id: 1,
        title: 'Software Engineer',
        description:
          'We are looking for a software engineer with 3 years of experience in React',
        company: 'Google',
        location: 'San Francisco, CA',
        salary: 10000,
        createdAt: new Date(),
      },
    ];
  }
}
