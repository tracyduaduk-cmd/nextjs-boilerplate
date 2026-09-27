'use client';

import React from 'react';
import { SpatialInstrument } from './SpatialInstrument';

interface SpatialWebGLSceneProps {
  className?: string;
}

export function SpatialWebGLScene({ className = '' }: SpatialWebGLSceneProps) {
  return (
    <SpatialInstrument
      mode="home"
      badgeLabel="[ GRAB / ROTATE 3D ]"
      scale={1.0}
      className={className}
    />
  );
}
