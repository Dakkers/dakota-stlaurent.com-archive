import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";

function Tools() {
  const stuff = [
    {
      to: 'keys',
      title: 'Practicing Keys',
      description: 'This tool will go through all 12 keys (in Western music!) at random – useful for practicing scales and chord shapes without going through the circle of fifths, which may lead to learning via muscle memory.'
    }
  ];

  return (
    <div>
      <Grid container spacing={2}>
        {
          stuff.map((tool, i) => (
            <Grid item key={i} xs={12} md={4}>
              <Card>
                <CardActionArea component={RouterLink} to={`/tools/${tool.to}`}>
                  <CardContent>
                    <Typography variant='h6'>
                      {tool.title}
                    </Typography>
                    <Typography>
                      {tool.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export { Tools };
