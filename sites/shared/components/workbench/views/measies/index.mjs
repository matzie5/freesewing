// Dependencies
import { Fragment } from 'react'
import { nsMerge } from 'shared/utils.mjs'
import { ns as authNs } from 'shared/components/wrappers/auth/index.mjs'
import { designMeasurements, horFlexClasses } from 'shared/utils.mjs'
// Hooks
import { useTranslation } from 'next-i18next'
import { useLoadingStatus } from 'shared/hooks/use-loading-status.mjs'
// Components
import {
  UserSetPicker,
  BookmarkedSetPicker,
  CuratedSetPicker,
  ns as setsNs,
} from 'shared/components/account/sets.mjs'
import { MeasiesEditor } from './editor.mjs'
import { Popout } from 'shared/components/popout/index.mjs'
import { Accordion } from 'shared/components/accordion.mjs'
import { MsetIcon, BookmarkIcon, CsetIcon, EditIcon } from 'shared/components/icons.mjs'

export const ns = nsMerge(authNs, setsNs)

export const MeasiesView = ({ design, Design, settings, update, missingMeasurements, setView }) => {
  const { t } = useTranslation(['workbench'])
  const { setLoadingStatus, LoadingStatus } = useLoadingStatus()

  const loadMeasurements = (set) => {
    update.settings([
      [['measurements'], designMeasurements(Design, set.measies)],
      [['units'], set.imperial ? 'imperial' : 'metric'],
    ])
    setView('draft')
    setLoadingStatus([true, 'appliedMeasies', true, true])
  }

  return (
    <div className="max-w-7xl mt-8 mx-auto px-4">
      <LoadingStatus />
      <h2>{t('account:measurements')}</h2>
      {missingMeasurements &&
        settings.measurements &&
        Object.keys(settings.measurements).length > 0 && (
          <Popout note dense noP>
            <h5>{t('weLackSomeMeasies', { nr: missingMeasurements.length })}</h5>
            <ol className="list list-inside ml-4 list-decimal">
              {missingMeasurements.map((m, i) => (
                <li key={i}>{t(`measurements:${m}`)}</li>
              ))}
            </ol>
            <p className="text-lg">{t('youCanPickOrEnter')}</p>
          </Popout>
        )}
      {!missingMeasurements && (
        <Popout note ompact>
          <span className="text-lg">{t('measiesOk')}</span>
        </Popout>
      )}
      <Accordion
        items={[
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="ownsets">{t('workbench:chooseFromOwnSets')}</h5>
                <MsetIcon className="w-6 h-6 shrink-0" />
              </div>
              <p>{t('workbench:chooseFromOwnSetsDesc')}</p>
            </Fragment>,
            <UserSetPicker
              key={2}
              design={design}
              clickHandler={loadMeasurements}
              t={t}
              size="md"
            />,
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="bookmarkedsets">{t('workbench:chooseFromBookmarkedSets')}</h5>
                <BookmarkIcon className="w-6 h-6 shrink-0" />
              </div>
              <p>{t('workbench:chooseFromBookmarkedSetsDesc')}</p>
            </Fragment>,
            <BookmarkedSetPicker design={design} clickHandler={loadMeasurements} t={t} size="md" />,
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="curatedsets">{t('workbench:chooseFromCuratedSets')}</h5>
                <CsetIcon />
              </div>
              <p>{t('workbench:chooseFromCuratedSetsDesc')}</p>
            </Fragment>,
            <CuratedSetPicker design={design} clickHandler={loadMeasurements} t={t} key={2} />,
          ],
          [
            <Fragment key={1}>
              <div className={horFlexClasses}>
                <h5 id="editmeasies">{t('workbench:editMeasiesByHand')}</h5>
                <EditIcon />
              </div>
              <p>{t('workbench:editMeasiesByHandDesc')}</p>
            </Fragment>,
            <MeasiesEditor {...{ Design, settings, update }} key={2} />,
          ],
        ]}
      />
    </div>
  )
}
