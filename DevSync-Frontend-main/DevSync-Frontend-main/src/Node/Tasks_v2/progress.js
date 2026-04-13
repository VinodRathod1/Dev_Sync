import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'flex',width:"30px", alignItems: 'center',
    justifyContent: 'center',}}>
      <CircularProgress  variant="determinate" {...props} />
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{fontSize:"9px",marginRight:"10px"}}  variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}