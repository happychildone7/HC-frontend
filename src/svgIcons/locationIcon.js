const LocationIcon = ({ size = 16, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 0C5.243 0 3 2.243 3 5c0 3.594 4.241 8.379 4.425 8.586a.5.5 0 0 0 .75 0C8.759 13.379 13 8.594 13 5c0-2.757-2.243-5-5-5Zm0 12.418C6.529 10.795 4 7.53 4 5a4 4 0 1 1 8 0c0 2.53-2.529 5.795-4 7.418ZM8 2.5A2.5 2.5 0 1 0 8 7.5 2.5 2.5 0 0 0 8 2.5Z" />
  </svg>
);

export default LocationIcon;