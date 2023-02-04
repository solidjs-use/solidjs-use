import { For } from 'solid-js'
import { coreTeamMembers } from '../data/contributors'
import { TeamMember } from './TeamMember'

export const HomeTeam = () => {
  return (
    <>
      <div class="vp-doc">
        <h2 op50 font-normal pt-5 pb-2>
          Meet The Team
        </h2>
      </div>
      <div grid="~ sm:cols-2 md:cols-3 lg:cols-4 gap-x-3 gap-y-20 items-center" p-10>
        <For each={coreTeamMembers}>{c => <TeamMember data={c} />}</For>
      </div>
    </>
  )
}
