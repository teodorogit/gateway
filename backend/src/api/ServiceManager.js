import fs from 'fs';
import path from 'path';
import Service from './Service.js';

class ServiceManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.services = this.loadServices();
  }

  groupApis() {
    const service = JSON.parse(Service)
    return service
  }

  loadServices() {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    console.log(JSON.parse(data))
    return JSON.parse(data).map(service => new Service(service.route, service.target));
  }

  saveServices() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.services, null, 2), 'utf-8');
  }

  getServiceByRoute(route) {
    return this.services.find(service => service.route === route);
  }

  addService(service) {
    console.log('SERVICE ->>', service)
    const forbiddenVar = ["/api", "/api/","/create","/create/","update","/update/","delete","/delete/"]

    const serviceKeys = Object.keys(service);
    const hasForbiddenKey = serviceKeys.some(key => forbiddenVar.includes(service[key].toLowerCase()));
    if (!this.services.includes(service) && !hasForbiddenKey) {
      this.services.push(service);
      this.saveServices();  
      return true
    } 
    return false
  }

  updateService(route, newRoute, newTarget) {
    const service = this.services.find(service => service.route === route);
    if (!service) throw new Error('Serviço não encontrado');
    service.route = newRoute;
    service.target = newTarget
    this.saveServices();
  }

  deleteService(route) {
    this.services = this.services.filter(service => service.route !== route);
    this.saveServices();
  }
}

export default ServiceManager;