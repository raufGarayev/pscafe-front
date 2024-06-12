import { ReactNode, useEffect, useState } from 'react'
import useSettingsStore from '../../stores/settingsStore'
import GeneralSettings from './components/generalSettings'
import TariffSettings from './components/tariffSettings'
import './settings.sass'
import DurationSettings from './components/durationSettings'
import BranchesSettings from './components/branchesSettings'

const Settings = () => {

    const [content, setContent] = useState<ReactNode>(null)
    const {selectedTab, setSelectedTab} = useSettingsStore()

    useEffect(() => {
        switch(selectedTab) {
            case 'general':
                setContent(<GeneralSettings />)
                break;
            case 'prices':
                setContent(<TariffSettings />)
                break;
            case 'durations':
                setContent(<DurationSettings />)
                break;
            case 'branches':
                setContent(<BranchesSettings />)
                break;
            
        }
    }, [selectedTab])

  return (
    <div className='settings'>
        <div className='settings__tabs'>
            <div className={`settings__tabs__tab ${selectedTab === 'general' && 'activeTab'}`} onClick={() => setSelectedTab('general')}>
                <h3>Ümumi</h3>
            </div>
            <div className={`settings__tabs__tab ${selectedTab === 'prices' && 'activeTab'}`} onClick={() => setSelectedTab('prices')}>
                <h3>Tariflər</h3>
            </div>
            <div className={`settings__tabs__tab ${selectedTab === 'durations' && 'activeTab'}`} onClick={() => setSelectedTab('durations')}>
                <h3>Müddətlər</h3>
            </div>
            <div className={`settings__tabs__tab ${selectedTab === 'branches' && 'activeTab'}`} onClick={() => setSelectedTab('branches')}>
                <h3>Filiallar</h3>
            </div>
        </div>
        {content}
    </div>
  )
}

export default Settings