import {Request, Response} from "express";
import Moment from "moment";

export default {
  "GET /api/availability": async (req: Request, res: Response) => {
    const start = Moment('2022-01-01')
    const end = Moment('2022-03-31')
    let current = start.clone()
    const dates = []
    while (current.day(7).isBefore(end)) {
      dates.push(current.clone().format("YYYY-MM-DD"))
    }
    res.send([
      {
        user_name: 'Moses',
        availability: dates.map(date => ({date, available: Math.random() < 0.5})),
      },
      {
        user_name: 'John',
        availability: dates.map(date => ({date, available: Math.random() < 0.7})),
      },
      {
        user_name: 'Peter',
        availability: dates.map(date => ({date, available: Math.random() < 0.2})),
      },
    ])
  }
}
