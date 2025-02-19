import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function MenuItemReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("http://localhost:4040/api/menu-report") // Update with actual backend API
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>MENU ENGINEERING REPORT</h2>

      {/* Error Message */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Loading Indicator */}
      {loading && <CircularProgress />}

      {/* Table */}
      {!loading && data.length === 0 && <p>No data available.</p>}

      {!loading && data.length > 0 && (
        <TableContainer component={Paper} sx={{ width: "95%", margin: "auto" }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#8BC34A", color: "white" }}>
                <TableCell><strong>Menu Item Name</strong></TableCell>
                <TableCell><strong>Number Sold</strong></TableCell>
                <TableCell><strong>Popularity (%)</strong></TableCell>
                <TableCell><strong>Item Cost Price</strong></TableCell>
                <TableCell><strong>Item Selling Price</strong></TableCell>
                <TableCell><strong>Item Profit</strong></TableCell>
                <TableCell><strong>Total Cost</strong></TableCell>
                <TableCell><strong>Total Revenue</strong></TableCell>
                <TableCell><strong>Cost (%)</strong></TableCell>
                <TableCell><strong>Total Profit</strong></TableCell>
                <TableCell><strong>Profit Category</strong></TableCell>
                <TableCell><strong>Popularity Category</strong></TableCell>
                <TableCell><strong>Menu Item Class</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.menuItemName}</TableCell>
                  <TableCell>{item.numberSold}</TableCell>
                  <TableCell>{item.popularityPercentage}%</TableCell>
                  <TableCell>${item.itemCostPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.itemSellingPrice.toFixed(2)}</TableCell>
                  <TableCell>${item.itemProfit.toFixed(2)}</TableCell>
                  <TableCell>${item.totalCost.toFixed(2)}</TableCell>
                  <TableCell>${item.totalRevenue.toFixed(2)}</TableCell>
                  <TableCell>{item.costPercentage}%</TableCell>
                  <TableCell>${item.totalProfit.toFixed(2)}</TableCell>
                  <TableCell>{item.profitCategory}</TableCell>
                  <TableCell>{item.popularityCategory}</TableCell>
                  <TableCell>{item.menuItemClassCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
