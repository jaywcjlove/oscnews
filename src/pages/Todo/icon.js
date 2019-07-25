import React from 'react';

export const Checked = (props) => (
  <svg width="20" height="20" viewBox="-10 -18 100 135" {...props}>
    <circle cx="50" cy="50" r="50" fill="none" stroke="#00a05a" strokeWidth="6" />
    <path fill="#00a05a" d="M72 25L42 71 27 56l-4 4 20 20 34-52z" />
  </svg>
);

export const Unchecked = (props) => (
  <svg width="20" height="20" viewBox="-10 -18 100 135" {...props}>
    <circle cx="50" cy="50" r="50" fill="none" stroke="#aaaaab" strokeWidth="6" />
  </svg>
);
