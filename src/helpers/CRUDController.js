import { Op } from 'sequelize';
import db from '../database/models';
import * as statusCodes from '../constants/statusCodes';
import jsonResponse from './jsonResponse';
import { PAGE_LIMIT } from '../constants/shared';
import {
  unauthorized, created, deleted, notExist,
} from '../constants/responseMessages';
import validatePagination from '../middlewares/validatePagination';
/**
 * Provides different methods to process
 * query rcords
 */
class CRUDController {
  constructor({ model = '', models = '', modelAssociations = {} } = {}) {
    this.model = model;
    this.models = models;
    this.modelAssociations = modelAssociations;
  }

  /**
   * Single record name
   * @return {String} model name
   */
  singleRecord() {
    return this.model.toLowerCase();
  }

  /**
   * Many records name
   * @return {String} model name
   */
  manyRecords() {
    return this.models || `${this.model.toLowerCase()}s`;
  }

  /**
   * Checks if the payment record exists
   * @param {any} req
   * @param {any} res
   * @param {*} next
   * @returns {*} response
   */
  async checkRecord(req, res, next) {
    const { id } = req.params;
    const record = await db[this.model].findOne({
      where: { id: { [Op.eq]: id } },
      ...this.modelAssociations,
    });
    if (!record) {
      return jsonResponse({
        res,
        status: statusCodes.NOT_FOUND,
        message: notExist(this.model),
      });
    }
    req[this.singleRecord()] = record;
    return next();
  }

  /**
   * Checks the record belongs to the current user
   * @param {any} req
   * @param {any} res
   * @param {*} next
   * @returns {*} response
   */
  async checkOwnership(req, res, next) {
    const { currentUser } = req;
    const record = req[this.singleRecord()];
    if (!record || currentUser.id !== record.user_id) {
      return jsonResponse({
        res,
        status: statusCodes.UNAUTHORIZED,
        message: unauthorized(),
      });
    }
    return next();
  }

  /**
   * Create a new record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  async createOne(req, res) {
    const {
      currentUser: { id },
    } = req;
    const record = await db[this.model].create({ ...req.body, user_id: id });
    return jsonResponse({
      res,
      status: statusCodes.CREATED,
      message: created(this.model),
      data: record.get(),
    });
  }

  /**
   * Retrieve a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} Response
   */
  getOne(req, res) {
    return jsonResponse({
      res,
      status: statusCodes.OK,
      data: req[this.singleRecord()].get(),
    });
  }

  /**
   * Update a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  async updateOne(req, res) {
    const { body } = req;
    const record = req[this.singleRecord()];
    await record.update(body);
    return jsonResponse({
      res,
      status: statusCodes.OK,
      data: {
        ...record.get(),
        ...body,
      },
    });
  }

  /**
   * Retrieve all records
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  async getMany(req, res, next) {
    await validatePagination(req, res, next);
    const {
      currentUser: { id },
    } = req;
    const { page } = req.params;
    const offset = PAGE_LIMIT * (page - 1);
    const records = await db[this.model].findAndCountAll(
      {
        offset,
        limit: PAGE_LIMIT,
        where: {
          userId: { [Op.eq]: id },
        },
        ...this.modelAssociations,
      },
    );

    const pages = Math.ceil(records.count / PAGE_LIMIT);

    return jsonResponse({
      res,
      status: statusCodes.OK,
      data: records.rows,
      meta: {
        total: records.count,
        page,
        pages,
      },
    });
  }

  /**
   * Delete a single record
   * @param {*} req
   * @param {*} res
   * @returns {*} response
   */
  async deleteOne(req, res) {
    const record = req[this.singleRecord()];
    await record.destroy();
    return jsonResponse({
      res,
      status: statusCodes.NO_CONTENT,
      message: deleted(this.model),
    });
  }
}

export default CRUDController;
