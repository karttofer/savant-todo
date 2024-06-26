/**
 *  <li key={index} className="p-2 border border-gray-200 rounded-lg">
        {result}
    </li>

    Here is where we will render the elements of the menu, we need to
    create another component for it
 */
// Dependencies
import { useState, ChangeEvent, FC, useRef, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useTranslation } from 'react-i18next'
// Components
import HotKeyIconComponent from '../HotKeyIconComponent'

interface SearchModalProps {
  onClose: () => void
}

const SearchModal: FC<SearchModalProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [results] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value)
    // TODO - Implement your search logic here and update results`
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  useHotkeys('esc', onClose, { enableOnFormTags: ['INPUT'] })

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-labelledby="search-modal-title"
      aria-modal="true"
    >
      <div className="bg-gray rounded-default shadow-lg p-6 w-1/2">
        <div>
          <h2 id="search-modal-title" className="sr-only">
            {t('search_modal_title')}
          </h2>
          <input
            ref={inputRef}
            type="text"
            className="rounded-default text-white w-full opacity-100 px-4 py-2 border border-gray2 rounded-lg shadow-sm bg-gray2 focus-visible:outline-orange focus-visible:outline focus-visible:outline-2"
            placeholder={t('search_modal_placeholder')}
            aria-label={t('search_modal_placeholder')}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="mt-4 space-y-2">
          {!results.length ? (
            <li className="text-white">{t('search_modal_no_results')}</li>
          ) : (
            results.map((result, index) => (
              <li key={index} className="p-2 border border-gray-200 rounded-lg">
                {result}
              </li>
            ))
          )}
        </ul>
        <button
          className="sr-only"
          onClick={onClose}
          aria-label={t('search_modal_close')}
        >
          {t('search_modal_close')}
        </button>
        <HotKeyIconComponent
          hotKey="ESC"
          infoMessage={t('search_modal_close')}
        />
      </div>
    </div>
  )
}

export default SearchModal
