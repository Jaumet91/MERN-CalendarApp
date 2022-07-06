export const CalendarEvent = ({ event }) => {
  const { title, user } = event;

  return (
    <div>
      {title}
      <strong> - {user.name}</strong>
    </div>
  );
};
