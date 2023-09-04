import {
  beforeEach,
  describe,
  it,
  expect,
} from '../../../../../../../shared/utils/stateless/testing/unit/unit-testing-library.impl'
import { cleanup, screen, waitFor } from '@testing-library/preact'
import { createCalendarAppSingleton } from '../../../../factory'
import { factory } from './utils'
import { viewDay } from '../../../../views/day'
import { viewWeek } from '../../../../views/week'
import { viewMonth } from '../../../../views/month'
import { openViewSelection } from '../../../../utils/stateless/testing/page-objects/view-selection'

describe('CalendarHeader', () => {
  beforeEach(() => {
    cleanup()
  })

  describe('changing view', () => {
    it('should set the view to month and update range heading, when selecting month view', async () => {
      const $app = createCalendarAppSingleton({
        defaultView: 'week',
        datePicker: { selectedDate: '2010-01-01' },
        views: [viewMonth, viewWeek, viewDay],
      })
      factory($app)
      const expectedRangeHeadingBeforeChange = 'December 2009 – January 2010'
      expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeTruthy()

      openViewSelection()

      await waitFor(() => {
        screen.getByText('Month').click() // select month view
      })

      await waitFor(() => {
        expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeFalsy()
        const expectedRangeHeadingAfterChange = 'January 2010'
        expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
      })
    })

    it('should set the view to week and update range heading, when selecting week view', async () => {
      const $app = createCalendarAppSingleton({
        defaultView: 'day',
        datePicker: { selectedDate: '2010-01-01' },
        views: [viewMonth, viewWeek, viewDay],
      })
      factory($app)
      const expectedRangeHeadingBeforeChange = 'January 2010'
      expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeTruthy()

      openViewSelection()

      await waitFor(() => {
        screen.getByText('Week').click() // select week view
      })

      await waitFor(() => {
        expect(screen.queryByText(expectedRangeHeadingBeforeChange)).toBeFalsy()
        const expectedRangeHeadingAfterChange = 'December 2009 – January 2010'
        expect(screen.queryByText(expectedRangeHeadingAfterChange)).toBeTruthy()
      })
    })
  })
})