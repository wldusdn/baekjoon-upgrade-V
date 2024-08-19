import React from 'react';
import Countdown from 'react-countdown';
import { Box, Button, Typography } from '@mui/material';
import iphone_alarm from '../assets/iphone_alarm.mp3';

const Timer = ({ initialMinutes }) => {
  const [timerMinutes, setTimerMinutes] = React.useState(
    initialMinutes * 60 * 1000,
  );
  const [isTimerActive, setIsTimerActive] = React.useState(false);
  const [isAlarmActive, setIsAlarmActive] = React.useState(false);
  const [audio] = React.useState(new Audio(iphone_alarm));

  React.useEffect(() => {
    if (isAlarmActive) audio.play();
    else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [isAlarmActive, audio]);

  const startTimer = () => {
    setIsTimerActive(true);
    setIsAlarmActive(false);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setIsAlarmActive(false);
    audio.pause();
    audio.currentTime = 0;
  };

  const adjustTimer = (adjustment) =>
    setTimerMinutes((prev) =>
      Math.max(10 * 60 * 1000, prev + adjustment * 60 * 1000),
    );

  const renderer = ({ hours, minutes, seconds }) => {
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
      <Typography variant="h4">
        {formattedHours}:{formattedMinutes}:{formattedSeconds}
      </Typography>
    );
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => adjustTimer(-10)}
          disabled={timerMinutes <= 10 * 60 * 1000}
        >
          -10분
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => adjustTimer(10)}
        >
          +10분
        </Button>
      </Box>

      {!isTimerActive && (
        <Typography variant="h6" sx={{ alignSelf: 'center' }}>
          {String(Math.floor(timerMinutes / 3600000)).padStart(2, '0')}:
          {String(Math.floor((timerMinutes % 3600000) / 60000)).padStart(
            2,
            '0',
          )}
          :{String(Math.floor((timerMinutes % 60000) / 1000)).padStart(2, '0')}
        </Typography>
      )}

      {isTimerActive && (
        <Countdown
          date={Date.now() + timerMinutes}
          renderer={renderer}
          onComplete={() => setIsAlarmActive(true)}
        />
      )}

      {isAlarmActive && (
        <Button
          variant="contained"
          color="error"
          onClick={stopTimer}
          sx={{ mt: 2 }}
        >
          종료
        </Button>
      )}

      {!isTimerActive && (
        <Button
          variant="contained"
          color="primary"
          onClick={startTimer}
          sx={{ mt: 2 }}
        >
          타이머 시작
        </Button>
      )}
    </Box>
  );
};

export default Timer;
