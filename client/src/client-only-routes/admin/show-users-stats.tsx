import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Table,
  FormGroup,
  ControlLabel,
  FormControl
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
    <FormGroup className='mb-3'>
      <ControlLabel>{`Plage d'inscriptions`}</ControlLabel>
      <FormControl
        componentClass='select'
        value={dateRange}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setDateRange(Number(e.target.value))
        }
        className='standard-radius-5'
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
    <FormGroup className='mb-3'>
      <ControlLabel>Filtrer par année</ControlLabel>
      <FormControl
        componentClass='select'
        value={filteredYear}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setFilteredYear(Number(e.target.value))
        }
        className='standard-radius-5'
      >
        {Array.from(new Set(enrollmentStats.map(stat => stat.year))).map(
          year => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </FormControl>
    </FormGroup>
  );

  const { minMonth, maxMonth } = getMonthWithExtremeEnrollments();

  return (
    <>
      <Row>
        <Col md={6} sm={12} xs={12}>
          {renderDateRangeOptions()}
        </Col>
        <Col md={6} sm={12} xs={12}>
          {renderYearFilter()}
        </Col>
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
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
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h4>{`Mois avec le moins d'inscriptions`}</h4>
          {minMonth ? (
            <Table responsive>
              <tbody>
                <tr>
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
          ) : null}
        </Col>
        <Col md={6}>
          <h4>{`Mois avec le plus d'inscriptions`}</h4>
          {maxMonth ? (
            <Table responsive>
              <tbody>
                <tr>
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
          ) : null}
        </Col>
      </Row>
    </>
  );
}
