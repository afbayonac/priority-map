import { pipe } from './pipe'
import { dispatch, subscribe } from './state'

const storage = window => {
  const { localStorage } = window

  pipe(
    () => {
      const items = localStorage.getItem('items')

      if (items) {
        return JSON.parse(items)
      }

      return [
        {
          id: 1,
          title: 'Run a 5k race within 6 months',
          description: `1. Start slowly, gradually increasing your distance and intensity over time.
2. Follow a training plan that fits your schedule and fitness level.
3. Stay consistent, running or exercising at least 3 times a week.
4. Find a running partner or join a running group for motivation and accountability.
5. Focus on my progress and celebrate mu small victories.
          `,
          priority: 150,
          archived: false
        },
        {
          id: 2,
          title: '30 Days of Gratitude: A Practice in Appreciation',
          description: 'For the next month, practice gratitude by writing down 3 things i am grateful for everyday. Reflect on the things that bring joy and appreciation to my life, I will write them down in a journal.',
          priority: 50,
          archived: false
        },
        {
          id: 3,
          title: 'Daily English Writing Practice',
          description: 'Choose a topic or theme to write about and set aside time to write',
          priority: 70,
          archived: false
        },
        {
          id: 4,
          title: 'Read a book 30 minutes a day for a month.',
          description: `- "The Catcher in the Rye"  by J.D. Salinger
- "To Kill a Mockingbird"  by Harper Lee
- "The Great Gatsby"  by F. Scott Fitzgerald
- "To Kill a Mockingbird"  by Harper Lee
- "The Old Man and the Sea"  by Ernest Hemingway
        `,
          priority: 20,
          archived: false
        },
        {
          id: 5,
          title: 'Volunteer',
          description: 'Dedicate time to helping others by volunteering with a non-profit organization or community group',
          priority: 35,
          archived: false
        },
        {
          id: 6,
          title: 'OWASP',
          description: `One way to gain recognition for your web security expertise is to become an OWASP member. OWASP members have access to a variety of resources, including access to the OWASP members-only mailing list, discounts on OWASP events, and the opportunity to participate in OWASP projects and committees. To become an OWASP member, you can visit the OWASP website and sign up for membership.

          Another way to gain recognition for your web security skills is to earn a professional certification. There are many organizations that offer certification programs in web security, such as the Certified Information Systems Security Professional (CISSP) offered by (ISC)², or the Certified Ethical Hacker (CEH) offered by EC-Council. These certification programs typically require candidates to pass an exam and meet certain experience and education requirements.`,
          priority: 60,
          archived: false
        }
      ]
    },
    items => {
      dispatch({ type: 'RECOVERY', payload: { items } })
      return items
    },
    items => {
      let value = items
      return state => {
        const { items } = state
        if (value === items) return
        value = items
        localStorage.setItem('items', JSON.stringify(items))
      }
    },
    subscribe
  )
}

export default storage
