import { ConfigProvider } from 'antd'
import { ReactNode } from 'react'

const AntThemeDesign = ({children}: {children: ReactNode}) => {
  return (
    <ConfigProvider
        theme={{
            components: {
                Table: {
                    headerBg: '#191919',
                    headerColor: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    colorBgContainer: '#101010',
                },
                Form: {
                    labelColor: '#fff',
                },
                Input: {
                    activeBorderColor: '#BAFF68',
                    hoverBorderColor: '#BAFF68',
                    colorBgContainer: '#191919',
                    colorText: '#fff',
                    colorBorder: 'rgba(255, 255, 255, 0.0352941176)',
                    paddingBlock: 8,
                    colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
                },
                InputNumber: {
                    colorBgContainer: '#191919',
                    colorText: '#fff',
                    colorBorder: 'rgba(255, 255, 255, 0.0352941176)',
                    colorPrimary: '#BAFF68',
                    colorPrimaryHover: '#BAFF68',
                    colorTextDisabled: '#fff',
                },
                Select: {
                    colorBgContainer: '#191919',
                    colorText: '#fff',
                    colorBorder: 'rgba(255, 255, 255, 0.0352941176)',
                    optionActiveBg: '#191919',
                    selectorBg: '#191919',
                    controlItemBgActive: '#101010',
                    colorBgTextActive: '#fff',
                    colorBgTextHover: '#fff',
                    colorTextSecondary: '#fff',
                    colorPrimary: '#BAFF68',
                    colorPrimaryHover: '#BAFF68',
                },
                Modal: {
                    footerBg: '#0B0B0B',
                },
                Pagination: {
                    colorText: '#fff',
                    itemActiveBg: '#BAFF68',
                    //@ts-ignore
                    borderRadius: '50%',
                },
                
            }
        }}
    >
        {children}
    </ConfigProvider>
  )
}

export default AntThemeDesign