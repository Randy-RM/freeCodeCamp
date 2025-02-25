import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl,
  Panel
} from '@freecodecamp/react-bootstrap';
import { CurrentSuperBlock } from '../../redux/prop-types';

// Types
type Member = {
  id: string;
  email: string;
  name: string;
  gender: string;
  currentsSuperBlock: CurrentSuperBlock[];
  groups: string[];
  createAt: string;
  phone: string;
  whatsapp: string;
  location: string;
  role: string;
};

interface EnrollmentStat {
  period: string;
  count: number;
  year: number;
  month: number;
}

interface Props {
  members: Member[] | undefined;
}

export function AllUserStates({ members }: Props) {
  const [enrollmentStats, setEnrollmentStats] = useState<EnrollmentStat[]>([]);
  const [dateRange, setDateRange] = useState<number>(3); // Plage de dates en mois
  const [filteredYear, setFilteredYear] = useState<number>(
    new Date().getFullYear()
  );

  // Fonction pour calculer les statistiques d'inscription par période de date
  const calculateEnrollmentStats = () => {
    const stats: {
      [key: string]: { count: number; year: number; month: number };
    } = {};
    const now = new Date();
    const rangeStart = new Date();
    rangeStart.setMonth(now.getMonth() - dateRange);

    members?.forEach(member => {
      const createDate = new Date(member.createAt);
      if (createDate >= rangeStart) {
        const period = `${createDate.getFullYear()}-${
          createDate.getMonth() + 1
        }`;
        stats[period] = stats[period] || {
          count: 0,
          year: createDate.getFullYear(),
          month: createDate.getMonth()
        };
        stats[period].count += 1;
      }
    });

    // Convertir en tableau trié par date
    const statsArray: EnrollmentStat[] = Object.entries(stats)
      .map(([period, { count, year, month }]) => ({
        period,
        count,
        year,
        month
      }))
      .sort(
        (a, b) => new Date(a.period).getTime() - new Date(b.period).getTime()
      );

    setEnrollmentStats(statsArray);
  };

  // Filtrer les statistiques par année
  const filterStatsByYear = (year: number) => {
    return enrollmentStats.filter(stat => stat.year === year);
  };

  // Calculer la somme des inscriptions pour une plage
  const calculateTotalEnrollments = () => {
    return enrollmentStats.reduce((total, stat) => total + stat.count, 0);
  };

  // Trouver le mois avec le plus et le moins d'inscriptions
  const getMonthWithExtremeEnrollments = () => {
    const min = Math.min(...enrollmentStats.map(stat => stat.count));
    const max = Math.max(...enrollmentStats.map(stat => stat.count));

    const minMonth = enrollmentStats.find(stat => stat.count === min);
    const maxMonth = enrollmentStats.find(stat => stat.count === max);

    return { minMonth, maxMonth };
  };

  useEffect(() => {
    calculateEnrollmentStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members, dateRange]);

  // Options de plage de dates
  const renderDateRangeOptions = () => (
    <FormGroup className='mb-3 flex flex-col '>
      <div className='flex items-center'>
        <svg
          className='filter-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          width={100}
          height={100}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
          />
        </svg>
        <ControlLabel class='colore-withe-text'>{`Plage d'inscriptions mensuelle`}</ControlLabel>
      </div>
      <FormControl
        componentClass='select'
        value={dateRange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setDateRange(Number(e.target.value))
        }
        className='standard-radius-5 '
      >
        <option value={3}>3 mois</option>
        <option value={6}>6 mois</option>
        <option value={12}>12 mois</option>
        <option value={24}>24 mois</option>
      </FormControl>
    </FormGroup>
  );

  // Options d'année pour filtrer les inscriptions
  const renderYearFilter = () => (
    <FormGroup className='mb-3 '>
      <div className='flex items-center'>
        <svg
          className='filter-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          width={80}
          height={80}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
          />
        </svg>

        <ControlLabel>Filtrer par année</ControlLabel>
      </div>
      <FormControl
        componentClass='select'
        value={filteredYear}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilteredYear(Number(e.target.value))
        }
        className='standard-radius-5'
      >
        {Array.from({ length: 4 }, (_, i) => 2022 + i).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </FormControl>
    </FormGroup>
  );

  const { minMonth, maxMonth } = getMonthWithExtremeEnrollments();

  return (
    <>
      <Row className='mb-4 flex gap-2rem align-center '>
        <div className='filter-card'>{renderDateRangeOptions()}</div>
        <div className='filter-card'>{renderYearFilter()}</div>
      </Row>

      <Row className='mt-4'>
        <Col md={6}>
          <Panel
            header="Mois avec le moins d'inscriptions de la période"
            className='custom-panel custom-panel-min'
          >
            {minMonth ? (
              <Table responsive>
                <tbody>
                  <tr className='highlight-row'>
                    <td colSpan={2} className='text-center p-4'>
                      <strong>{`Mois avec le moins d'inscriptions de la plage`}</strong>
                    </td>
                  </tr>
                  <tr className='highlight-row'>
                    <td>
                      {new Date(minMonth.period).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </td>
                    <td>{minMonth.count}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>0</p>
            )}
          </Panel>
        </Col>

        <Col md={6}>
          <Panel
            header="Mois avec le plus d'inscriptions"
            className='custom-panel custom-panel-max'
          >
            {maxMonth ? (
              <Table responsive>
                <tbody>
                  <tr className='highlight-row'>
                    <td colSpan={2} className='text-center p-4'>
                      <strong>{`Mois avec le plus d'inscriptions`}</strong>
                    </td>
                  </tr>
                  <tr className='highlight-row'>
                    <td>
                      {new Date(maxMonth.period).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </td>
                    <td>{maxMonth.count}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>0</p>
            )}
          </Panel>
        </Col>
      </Row>

      <Row>
        <Col md={12} sm={12} xs={12}>
          <Panel header="Statistiques d'inscriptions" className='custom-panel'>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>{`Nombre d'inscriptions`}</th>
                </tr>
              </thead>
              <tbody>
                {filterStatsByYear(filteredYear).map(stat => (
                  <tr key={stat.period}>
                    <td>
                      {new Date(stat.period).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </td>
                    <td>{stat.count}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td>
                    <strong>{calculateTotalEnrollments()}</strong>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Panel>
        </Col>
      </Row>
    </>
  );
}
