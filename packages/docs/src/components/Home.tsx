import { HomeContributors } from './HomeContributors'
import { HomeSponsors } from './HomeSponsors'
import { HomeTeam } from './HomeTeam'

export const Home = () => (
    <div class="home" mt-4 flex flex-col items-center>
      <HomeTeam />
      <HomeSponsors />
      <HomeContributors />
    </div>
)
