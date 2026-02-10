import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Controller('theatre')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('STAGE_SERVICE') private client: ClientProxy,
  ) {}

  @Get('dashboard')
  getDashboardData() {
    return this.client.send({ cmd: 'get_telemetry' }, {}).pipe(
      map(data => {
        const thermalScore = 100 - (data.tempCelsius - 22) * 2;
        const systemHealth = Math.max(0, Math.min(100, thermalScore));
  
        let finalStatus = data.systemStatus; 
        if (data.tempCelsius > 35) finalStatus = 'CRITICAL';
  
        return {
          ...data,
          systemHealth,
          systemStatus: finalStatus,
          sceneryLoad: data.isLive ? 75 : 10,
          curtainSpeed: data.curtainSpeed || 'READY',
          
          activeNodes: [
            { 
              name: 'Spot A', 
              status: data.systemStatus === 'LIVE' ? 'Online' : 'Standby', 
              hue: data.systemStatus === 'LIVE' ? '#ffd700' : '#4b5563' 
            },
            { 
              name: 'Main Mic', 
              status: data.audioGain > 90 ? 'Warning' : (data.systemStatus === 'LIVE' ? 'Online' : 'Standby'), 
              hue: '#ff6b6b' 
            }
          ],

          curtainStatus: data.curtainSpeed, 
          
          stageTasks: [
            { label: "Opening Cue: Spotlights", time: "08:00 PM", status: "done" },
            { label: "Live Performance", time: "08:15 PM", status: data.systemStatus === 'LIVE' ? "active" : "pending" },
          ],
  
          safetyNotice: finalStatus === 'CRITICAL' 
            ? 'Thermal Warning: Cooling required!' 
            : data.systemStatus === 'LIVE' ? 'Show in progress...' : 'Ready for cues.'
        };
      })
    );
  }
  @Post('start')
  triggerStart() {
    return this.client.send({ cmd: 'trigger_start' }, {});
  }

  @Post('stop')
  triggerStop() {
    return this.client.send({ cmd: 'trigger_stop' }, {});
  }
}