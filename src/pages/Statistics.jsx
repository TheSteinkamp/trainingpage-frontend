import { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Form, Button, Table, Badge, Alert } from "react-bootstrap";
import "../styles/Statistics.css";

function Statistics() {
  const [data, setData] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [userId, setUserId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [view, setView] = useState("none");
  const [error, setError] = useState("");
  const API_BASE = import.meta.env.VITE_API_URL;

  const getTrainings = () => {
    axios.get(`${API_BASE}/${userId}`)
      .then(res => {
        setData(res.data);
        setView("list");
        setError("");
      })
      .catch(() => setError("Could not fetch training list"));
  };

  const getUserStats = () => {
    axios.get(`${API_BASE}/statistic/user/${userId}`)
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Could not fetch statistics"));
  };

  const getPeriodStats = () => {
    if (!startDate || !endDate) return alert("Please select a date range!");
    axios.get(`${API_BASE}/statistic/period/user/${userId}`, {
      params: { startDate, endDate }
    })
      .then(res => {
        setData(res.data);
        setView("stats");
        setError("");
      })
      .catch(() => setError("Could not fetch period statistics"));
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

  return (
    <Container className="stats-container py-4">
      <h2 className="section-title-orange mb-4">Training Statistics</h2>

      {/* Control Panel */}
      <Card className="control-card shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={2}>
              <Form.Label className="fw-bold small text-uppercase">User ID</Form.Label>
              <Form.Control
                type="number"
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Label className="fw-bold small text-uppercase">From Date</Form.Label>
              <Form.Control
                type="date"
                onChange={e => setStartDate(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Label className="fw-bold small text-uppercase">To Date</Form.Label>
              <Form.Control
                type="date"
                onChange={e => setEndDate(e.target.value)}
              />
            </Col>
            <Col md={4} className="d-flex gap-2">
              <Button variant="outline-dark" className="flex-grow-1" onClick={getTrainings}>Sessions</Button>
              <Button variant="outline-dark" className="flex-grow-1" onClick={getUserStats}>Stats</Button>
              <Button variant="outline-dark" className="flex-grow-1" onClick={getPeriodStats}>Period</Button>
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

      {/* View 1: Training History List */}
      {view === "list" && Array.isArray(data) && (
        <div className="mt-4">
          <h3 className="section-title-orange h4 mb-3">Sessions for User {userId}</h3>
          <Row>
            {data.map(t => (
              <Col key={t.id} md={6} className="mb-3">
                <Card className="training-item-card border-0 shadow-sm border-start border-orange border-4">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <h5 className="mb-1">Session #{t.id}</h5>
                      <small className="text-muted">{t.date}</small>
                    </div>
                    <p className="mb-0">⏱ <strong>{t.duration}</strong> minutes</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}

      {/* View 2: Stats Overview (Bento Style) */}
      {view === "stats" && data && (
        <div className="mt-4">
          <h3 className="section-title-orange h4 mb-3 text-center">Overview</h3>
          <Row className="g-3">
            <Col md={4}>
              <Card className="stats-box text-center shadow-sm border-0 bg-dark text-white">
                <Card.Body>
                  <div className="display-5 fw-bold">{data.totalTrainings}</div>
                  <div className="text-uppercase small opacity-75">Total Sessions</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stats-box text-center shadow-sm border-0 bg-orange text-white">
                <Card.Body>
                  <div className="display-5 fw-bold">{data.totalDuration}</div>
                  <div className="text-uppercase small opacity-75">Total Minutes</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="stats-box text-center shadow-sm border-0 bg-light">
                <Card.Body>
                  <div className="display-5 fw-bold text-dark">{data.averageDuration?.toFixed(1)}</div>
                  <div className="text-uppercase small text-muted">Avg. Duration</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* View 3: Leaderboard (Table) */}
      {view === "users" && (
        <div className="mt-4">
          <h3 className="section-title-orange h4 mb-3 text-center">Leaderboard</h3>
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
                    <td className="ps-4 fw-bold">{name}</td>
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

export default Statistics;