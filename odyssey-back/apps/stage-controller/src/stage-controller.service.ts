import { Injectable } from '@nestjs/common';

@Injectable()
export class StageControllerService {
  private isEmergency = false;
  private isLive = false;

  toggleStart() {
    this.isLive = true;
    this.isEmergency = false;
    console.log('Service: Stage is now LIVE');
    return { status: 'success' };
  }

  toggleStop() {
    this.isLive = false;
    this.isEmergency = true;
    console.log('Service: EMERGENCY STOP');
    return { status: 'emergency_active' };
  }

  getStageStatus() {
    return {
      lightIntensity: this.isEmergency ? 0 : (this.isLive ? 85 : 10),
      systemStatus: this.isEmergency ? 'CRITICAL' : (this.isLive ? 'LIVE' : 'STABLE'),
      curtainSpeed: this.isEmergency ? 'LOCKED' : (this.isLive ? 'OPEN' : 'READY'),
      tempCelsius: 22 + Math.floor(Math.random() * 15), // Simulated heat from stage lights
      powerUsage: (Math.random() * 5.5).toFixed(2), // kW usage
      activeNodes: Math.floor(Math.random() * 12) + 1, // Number of "Stage IoT Nodes" online
      audioGain: this.isLive ? (60 + Math.floor(Math.random() * 40)) : 0, // Decibel levels
      timestamp: new Date().toISOString(),
    };
  }
}
