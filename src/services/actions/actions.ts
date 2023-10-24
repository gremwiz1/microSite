export const SAVE_VIDEO_TIME = "SAVE_VIDEO_TIME";

export const saveVideoTime = (time: number) => ({
  type: SAVE_VIDEO_TIME,
  payload: time,
});
