/** @jsxImportSource @emotion/react */
import styles from '@/styles/Home.module.css'
import GamesTable from '@/components/gamesTable'
import { Space } from 'antd'
import UsersTable from '@/components/usersTable'
import { mainDiv, homePageTable } from '@/styles/main-styles'

export default function Home() {
  return (
    <div css={mainDiv}>
      <div css={homePageTable}>
        <GamesTable isHomePage={true} />
      </div>
      <div css={homePageTable}>
        <UsersTable isHomePage={true} />
      </div>
    </div>
  )
}
