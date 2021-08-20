import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("vacancies")
class Vacancy {
  @PrimaryColumn()
  id?: string;

  @Column()
  role: string;

  @Column()
  type: string;

  @Column()
  area: string;

  @Column("simple-array")
  requirements: string[];

  @Column()
  salary: number;

  @Column()
  quantity: number;

  @Column()
  company_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Vacancy };
