import {Request, Response} from "express";

export default {
  "GET /api/overview": async (req: Request, res: Response) => {
    res.send([
      {
        date: '2022/01/14',
        name: 'friday-prayer',
        servants: [
          {
            title: 'prayer.lead',
            name: '陳靜怡',
          },
        ],
      },
      {
        date: '2022/01/16',
        name: 'sunday-worship',
        servants: [
          {
            title: 'general.preacher',
            name: '張基立',
          },
          {
            title: 'jk.lead',
            name: '謝得人',
          },
          {
            title: 'jk.piano',
            name: '曾彥勳',
          },
          {
            title: 'teacher.pre-3.lead',
            name: '林威志',
          },
          {
            title: 'teacher.pre-3.assist',
            name: '邵嬿蓁',
          },
          {
            title: 'teacher.post-3',
            name: '廖聲蕙',
          },
          {
            title: 'general.greeter',
            name: '百恩',
          },
          {
            title: 'jk.ppt',
            name: '郭嘉惠',
          },
          {
            title: 'jk.streaming',
            name: '魏誠忠',
          },
          {
            title: 'jk.sound',
            name: '陳靜怡',
          },
          {
            title: 'meal.dishes',
            name: '暫停乙次',
          },
          {
            title: 'meal.cook',
            name: '暫停乙次',
          },
        ],
      },
    ])
  }
}
