import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert } from "react-bootstrap";
import "../styles/Statistics.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function UserStats() {
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const [chartMap, setChartMap] = useState({});
  const [stats, setStats] = useState(null);
  const [sessions, setSessions] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [view, setView] = useState("none");
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;

  const getUserStats = async () => {
    try {
      const statsRes = await axios.get(`${API_BASE}/statistic/stats`, {
        params: { id: user?.userId }
      });
      const sessionsRes = await axios.get(`${API_BASE}/statistic/session`, {
        params: { id: user?.userId }
      });
      const sortedSession = sessionsRes.data.sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
      setStats(statsRes.data);
      setSessions(sortedSession);
      setView("stats");
      setError("");
    } catch (error) {
      setError("Could not fetch statistics")
    }
  };

  const getPeriodStats = async () => {
    try {
      const formattedStart = formatLocal(startDate);
      const formattedEnd = formatLocal(endDate);

      const statsRes = await axios.get(`${API_BASE}/statistic/period/stats`, {
        params: {
          id: user?.userId,
          startDate: formattedStart,
          endDate: formattedEnd
        }
      });
      const sessionsRes = await axios.get(`${API_BASE}/statistic/period/session`, {
        params: {
          id: user?.userId,
          startDate: formattedStart,
          endDate: formattedEnd
        }
      });

      const sortedSession = sessionsRes.data.sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0));
      setStats(statsRes.data);
      setSessions(sortedSession);
      setView("stats");
      setError("");
    } catch (error) {
      setError("Could not fetch period statistics")
    }
  };

  const getCharts = () => {
    console.log("User ID:", user?.userId)
    axios.get(`${API_BASE}/statistic/chart`, {
      params: { id: user?.userId }
    })
      .then(res => {
        setChartMap(res.data);
        setView("chart");
        setError("");
      })
      .catch(() => setError("Could not fetch training list"));
  };

  const getAllUsers = () => {
    axios.get(`${API_BASE}/statistic/users`)
      .then(res => {
        setUserMap(res.data);
        setView("users");
        setError("");
      })
      .catch(() => setError("Could not fetch user leaderboard"));
  };

  const formatLocal = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Container className="stats-container py-4">
      <h2 className="section-title-orange mb-4">Training Statistics</h2>

      {/* Control Panel */}
      <Card className="control-card shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={3}>
              <Form.Label className="fw-bold small text-uppercase">From Date </Form.Label>
              <Col>
                <DatePicker selected={startDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(startDate) => setStartDate(startDate)}
                  customInput={<Form.Control />} />
              </Col>
            </Col>
            <Col md={3}>
              <Form.Label className="fw-bold small text-uppercase">To Date</Form.Label>
              <Col>
                <DatePicker selected={endDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(endDate) => setEndDate(endDate)}
                  customInput={<Form.Control />} />
              </Col>
            </Col>
            <Col md={6} className="d-flex gap-2">
              <Button variant="outline-orange" className="flex-grow-1" onClick={getCharts}>Chart</Button>
              <Button variant="outline-orange" className="flex-grow-1" onClick={getUserStats}>Stats</Button>
              <Button variant="outline-orange" className="flex-grow-1" onClick={getPeriodStats}>Stats for period</Button>
            </Col>
          </Row>
          <div className="mt-3">
            <Button className="btn-primary-custom w-100" onClick={getAllUsers}>
              Show Leaderboard (All Users)
            </Button>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* View 1: charts */}
      {view === "chart" && chartMap && (
        <div className="mt-4">
          <h3>Top chart</h3>
          <div className="table-wrapper shadow-sm rounded overflow-hidden">
            <Table hover responsive align="middle" className="mb-0 bg-white">
              <thead className="bg-orange text-white">
                <tr>
                  <th className="ps-4 border-0">Session's focus</th>
                  <th className="text-center border-0">Completed Sessions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(chartMap).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                  <tr key={type}>
                    <td className="stat-list">{type}</td>
                    <td className="text-center">
                      <Badge pill className="bg-orange-light text-orange px-3 py-2">
                        {count} Sessions
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* View 2: Stats Overview */}
      {view === "stats" && stats && sessions && (
        <div className="mt-4">
          <h3>Overview</h3>
          <Row className="g-3">
            <Col md={4}>
              <Card className="stats-box bg-dark text-white">
                <Card.Body>
                  <div className="display-5 fw-bold">{stats.totalTrainings}</div>
                  <div className="text-uppercase small opacity-75">Total Sessions</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stats-box bg-orange text-white">
                <Card.Body>
                  <div className="display-5 fw-bold">{stats.totalDuration}</div>
                  <div className="text-uppercase small opacity-75">Total Minutes</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stats-box bg-light">
                <Card.Body>
                  <div className="display-5 fw-bold text-dark">{stats.averageDuration?.toFixed(1)}</div>
                  <div className="text-uppercase small text-muted">Avg. Duration (minutes)</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br></br>

          <div className="mt-4">
            <h3>Sessions</h3>
            <div className="table-wrapper shadow-sm rounded">
              <Table hover responsive align="middle" className="mb-0 bg-white">
                <tbody>
                  {sessions.map(t => (
                    <tr key={t.id}>
                      <td><h4 className="stat-list">{t.type}</h4></td>
                      <td className="text-center">
                        <h4><Badge className="bg-orange-light text-orange px-3 py-2">
                          {t.date} — {t.duration} min
                        </Badge></h4>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      )}

      {/* View 3: Leaderboard */}
      {view === "users" && userMap && (
        <div className="mt-4">
          <h3>Leaderboard</h3>
          <div className="table-wrapper shadow-sm rounded overflow-hidden">
            <Table hover responsive align="middle" className="mb-0 bg-white">
              <thead className="bg-orange text-white">
                <tr>
                  <th className="ps-4 border-0">User Name</th>
                  <th className="text-center border-0">Completed Sessions</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userMap).map(([name, count]) => (
                  <tr key={name}>
                    <td className="stat-list">{name}</td>
                    <td className="text-center">
                      <Badge pill className="bg-orange-light text-orange px-3 py-2">
                        {count} Sessions
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </Container>
  );
}

export default UserStats;