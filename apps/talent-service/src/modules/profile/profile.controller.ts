import { Controller, Get } from '@nestjs/common';

const profiles = [
  {
    id: 1,
    userId: 1,
    skills: [
      {
        title: 'React',
        level: 3,
      },
      {
        title: 'Node.js',
        level: 5,
      },
      {
        title: 'TypeScript',
        level: 4,
      },
    ],
    summary:
      'I am a software engineer with a passion for building web applications.',
    experience: [
      {
        title: 'Software Engineer',
        company: 'Google',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    skills: [
      {
        title: 'React',
        level: 3,
      },
    ],
    summary:
      'I am a software engineer with a passion for building web applications.',
    experience: [
      {
        title: 'Software Engineer',
        company: 'Google',
        startDate: '2020-01-01',
        endDate: '2021-01-01',
      },
    ],
  },
];

@Controller('profiles')
export class ProfileController {
  @Get()
  getProfiles(): Array<any> {
    const userId = 1; // hardcode
    return profiles.filter((profile) => profile.userId === userId);
  }
}
