function UpcomingBetItem(props) {
  return (
    <div>
      <div>Bet id: {props.betId}</div>
      <div>Fight id: {props.fight.id}</div>
    </div>
  );
}

export default UpcomingBetItem;
