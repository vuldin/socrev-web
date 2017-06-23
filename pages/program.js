import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

const contentPaddingX = 90
const smallContentPaddingX = 45

export default () =>
  <Layout>
    <Padding>
      <em>{`
The Program of the US section of the International Marxist Tendency as approved by the 2016 National Congress.
If you agree with our proposals to transform the US and the world through socialist revolution, contact us about joining!
    `}</em>
      <h2>{`
Build a mass socialist party of the working class!
    `}</h2>
      <p>{`
Break with the Democrats and Republicans!
In the final analysis, only organized labor has the numbers and resources to effectively challenge the bosses' parties.
Such a party must be armed with a class independent, socialist program that breaks with capitalism.
By mobilizing the working class majority at the workplace, in the unions, on the streets, and at the polls, we can fight and win against the bosses.
    `}</p>
      <h2>{`
The right for all workers to strike and belong to a union
    `}</h2>
      <p>{`
Repeal all anti-union laws including Taft-Hartley.
End compulsory arbitration and the victimization of trade unionists and those forming new unions.
Organize the unorganized.
No to concessions and give-backs!
All union officials should be regularly elected with the right of immediate recall by the membership, and receive no more than the average wage of a skilled worker.
    `}</p>
      <h2>{`
End unemployment — quality jobs for all
    `}</h2>
      <p>{`
For a national minimum wage of at least $25 per hour.
Thirty hours work for forty hours pay.
The right to a secure, full-time job, full benefits, or a place in education for all, including temp workers and interns.
No to layoffs.
For a massive program of useful public works to create quality union jobs to rebuild our infrastructure.
Wages to be tied to inflation through periodic Cost of Living Adjustments (COLA).
For union control over hiring and firing.
Establish union-controlled job training and hiring halls in neighborhoods with high unemployment.
Voluntary retirement at age 55 with full benefits.
Raise Social Security benefits and stop privatization.
    `}</p>
      <h2>{`
Quality, affordable housing for all
    `}</h2>
      <p>{`
End the capitalist housing market, which leads to gentrification and homelessness.
For an immediate moratorium on evictions, with residents of foreclosed properties allowed to stay in their homes.
For the nationalization of foreclosed and vacant homes, to be allocated to those in need under democratic public control.
No compensation to the foreclosing owners, except in cases of proven need.
Rent for all housing, including Section 8 and government-owned housing, to be fixed at not more than 10 percent of wages, as part of a voluntary, socialized plan for housing.
    `}</p>
      <h2>{`
Universal, quality health care
    `}</h2>
      <p>{`
For a socialized, national health care system.
Nationalize the health insurance companies, the medical equipment and pharmaceutical industries, the mega-hospital systems and related clinics, and integrate them into a single state-owned and democratically managed and administered health provider.
Full access for all to the latest medical technology, treatments, and discoveries.
Free scientific research from the profit motive.
Massively fund research to eradicate AIDS, cancer, and other diseases.
    `}</p>
      <h2>{`
Quality education for all
    `}</h2>
      <p>{`
Abolish tuition fees and forgive student loans.
Provide living grants and paid internships to all students.
Nationalize the private universities and colleges and merge them into one united public system of higher education.
Fully fund and expand our public schools, colleges, and universities.
End corporate encroachment into the classroom.
No to means testing, vouchers, charter schools, and privatization.
No to "Race to the Top" and "No Child Left Behind."
For lifelong learning for all from the cradle to the grave.
    `}</p>
      <h2>{`
A socialized plan of production for agriculture
    `}</h2>
      <p>{`
Nationalize the food distribution and agrichemical giants that endanger public health in the pursuit of profit.
A democratic plan of food production would protect small farmers' and agricultural workers' jobs and security.
Fully fund nutrition assistance and extension programs.
Full union rights for all agricultural workers.
    `}</p>
      <h2>{`
Action to protect the environment
    `}</h2>
      <p>{`
For public ownership and control over natural resources — the land, major industries, mining, and logging companies, transport, oil, gas, and other energy—to ensure a safe and healthy environment for all.
Paid retraining and guaranteed employment for displaced workers.
Environmental plans should be measured in generations, not fiscal quarters.
Free, expanded, and efficient public transportation for all.
    `}</p>
      <h2>{`
Fight against all forms of discrimination — equal rights for all
    `}</h2>
      <p>{`
Equal pay for work of equal value.
Full paid leave for expectant mothers after the 1st trimester; parental leave with full pay for up to two years after birth or adoption.
Free and safe, quality after-school programs and childcare facilities in or near the workplace.
Affordable public laundry services and subsidized restaurants serving healthy, quality food to help free working women from domestic servitude.
Full reproductive rights up to and including abortion.
No to discrimination on the basis of sexual preference, gender identity, or expression.
Defend our civil liberties from attacks in the name of the "war on terror."
For genuine freedom of expression.
Nationalize the means of communication and democratize access to the media and the use of public meeting spaces on the basis of proportional representation.
    `}</p>
      <h2>{`
For the unity of the working class!
    `}</h2>
      <p>{`
An injury to one is an injury to all!
Mobilize the labor movement to combat racism, discrimination, police brutality, and mass incarceration.
End the phony war on drugs in the US and internationally.
Abolish the death penalty and release all political prisoners.
For the immediate and unconditional legalization of all undocumented immigrants.
Full rights and amnesty for immigrant workers and their families.
End all racist immigration and asylum controls.
For the right of residency and dual citizenship.
For the right to speak one’s own language.
Access to Social Security with equal benefits for all.
No to temporary "guest worker" programs.
For family reunification and an immediate end to raids and deportations.
No to border walls, militarization, and repression.
Reparations for centuries of exploitation, racism, and oppression can only be achieved by ending capitalism and building socialism.
    `}</p>
      <h2>{`
Nationalize the key levers of the economy: the major industries, banks, and corporations
    `}</h2>
      <p>{`
No to austerity — make the rich pay for the crisis!
Break with the irrational chaos of the capitalist free market.
Nationalize the Fortune 500.
No compensation to the millionaires, only to those in genuine need.
All nationalized companies to be run under democratic workers’ control and management, integrated into a socialist plan of production to meet the needs of society.
Consolidate the nationalized banks into a single, publicly owned and administered bank to protect workers' savings and guarantee affordable loans to all.
    `}</p>
      <h2>{`
Socialist internationalism and world revolution
    `}</h2>
      <p>{`
End NAFTA, TPP and other imperialist trade and banker's agreements.
Abolish the UN, NATO, WTO, World Bank, and International Monetary Fund and write off the debts imposed by Wall Street and imperialism.
For international economic cooperation based on the interests of the workers of the world, not a handful of multinationals.
No to the war on workers and the poor at home and abroad.
Cut the military budget and invest instead in social needs.
No to militarism and intervention in the Middle East and around the world.
Unite with Canadian and Latin American workers in a socialist federation of the Americas as part of a world socialist federation.
    `}</p>
    </Padding>
  </Layout>

const Padding = styled.div`
  padding: 0 ${contentPaddingX}px;
  @media (max-width: 720px) {
  padding: 0 ${smallContentPaddingX}px;
  }
`
