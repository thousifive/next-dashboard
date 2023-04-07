/** @jsxImportSource @emotion/react */
import GamesTable from '@/components/gamesTable'
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
